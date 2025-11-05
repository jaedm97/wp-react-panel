import React, {useMemo, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import settingsData from "@/settings";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FieldItem} from "@/components/fields/field-item";

type Field = {
    id: string;
    title?: string;
    desc?: string;
    type: "number" | "text" | "switch" | "nice2" | "tags" | "select" | "password" | string;
    placeholder?: string | number;
    default?: any;
    label?: string;
    options?: Record<string, string>;
    settings?: { placeholder?: string; multiple?: boolean; classes?: string };
};

type Section = {
    id: string;
    name: string;
    desc?: string;
    classes?: string;
    fields?: Field[];
};

type SettingTab = {
    name: string;
    sections: Record<string, Section>;
};

type Settings = Record<string, SettingTab>;

export default function App() {
    const {toast} = useToast();

    const pageSettingsData = useMemo(() => settingsData(), []);

    const allSetting = pageSettingsData.settings ?? [];
    const allConfigs = pageSettingsData.configs ?? [];

    const [loading, setLoading] = useState(false);

    const formDataToJSON = (fd: FormData) => {
        const out: Record<string, any> = {};
        for (const [rawKey, value] of fd.entries()) {
            const key = rawKey.endsWith('[]') ? rawKey.slice(0, -2) : rawKey;
            if (key in out) {
                // already seen -> ensure array and push
                if (!Array.isArray(out[key])) out[key] = [out[key]];
                out[key].push(value as string);
            } else {
                out[key] = rawKey.endsWith('[]') ? [value as string] : (value as string);
            }
        }
        return out;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const allSettings = formDataToJSON(formData);

        try {
            const response = await fetch(`${pageSettingsData.settingsApiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': pageSettingsData.nonce
                },
                body: JSON.stringify(allSettings)
            });

            console.log(response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                toast({title: "Settings Saved!", description: "Your plugin settings have been updated.", variant: "default"});
            } else {
                throw new Error(data.message || 'Failed to save settings.');
            }
        } catch (error: any) {
            console.error('Error saving settings:', error);
            toast({
                title: "Error Saving Settings",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const widthMap = {
        mini: "max-w-2xl",
        small: "max-w-4xl",
        medium: "max-w-5xl",
        large: "max-w-6xl",
        extra: "max-w-8xl",
    } as any;
    const pageWidth = allConfigs?.page_width ?? "medium";
    const containerWidth = widthMap[pageWidth];

    return (
        <form onSubmit={handleSubmit} className={'p-6 bg-[#f9fafb] ' + allConfigs.wrapper_classes}>
            <Toaster/>
            <div className={'mx-auto ' + containerWidth}>
                <div className="header flex items-center justify-between mb-6">
                    <div className="logo flex items-center justify-between">
                        <img className="w-[200px] mr-2" src={pageSettingsData.logoUrl} alt="Plugin Logo"/>
                        <span className="text-[12px]">Version: {pageSettingsData.pluginVersion}</span>
                    </div>
                    <div className="submit-button flex items-center justify-between">
                        {
                            loading ?
                                (
                                    <div data-slot="badge" className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle size-4 animate-spin" role="status">
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                        </svg>
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    <></>
                                )
                        }
                        <Button className="ml-2" type="submit">Save Changes</Button>
                    </div>
                </div>

                <Tabs defaultValue={Object.keys(allSetting)[0]} className="">
                    {
                        allConfigs?.show_tabs !== false && (
                            <TabsList>
                                {
                                    Object.entries(allSetting ?? {}).map(([key, settingTab]) => (
                                        <TabsTrigger key={key} value={key}>
                                            {"name" in (settingTab as any) ? (settingTab as any).name : String(key)}
                                        </TabsTrigger>
                                    ))
                                }
                            </TabsList>
                        )
                    }

                    {
                        // Loop through the tabs
                        Object.entries((allSetting ?? {}) as Settings).map(([tabKey, settingTab]) => (
                            <TabsContent key={tabKey} value={tabKey} forceMount className="data-[state=inactive]:hidden">
                                <div className="w-full mx-auto space-y-6">
                                    {
                                        // Loop through the sections in a tab
                                        Object.entries(settingTab.sections ?? {}).map(([sectionKey, section]) => (
                                            <div key={sectionKey} className={"mb-6 " + (section.classes ?? "")} id={section.id}>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">{section.name}</CardTitle>
                                                        <CardDescription>{section.desc}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        {
                                                            // Loop through the fields in a section
                                                            (section.fields ?? []).map((field) => (
                                                                <FieldItem key={field.id} fieldData={field}/>
                                                            ))
                                                        }
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
        </form>
    )
}
