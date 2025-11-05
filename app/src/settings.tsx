import logoURL from "../assets/logo.svg";

declare global {
    interface Window {
        reactData: {
            nonce: string;
            settingsApiUrl: string;
            pluginVersion: string;
            logo_url: string;
            options: Record<string, any>;
            settings: any;
            configs: any;
        };
    }
}

export default function settingsData() {
    const defaultSettings = {
        general: {
            name: "General Settings",
            sections: {
                section_app_config: {
                    id: "section_app_config",
                    name: "Application Configuration",
                    desc: "Configure the basic settings for your application.",
                    fields: [
                        {
                            id: "app_name",
                            title: "Application Name",
                            desc: "Enter the name of your application",
                            type: "text",
                            placeholder: "My Awesome App",
                            default: "My App"
                        },
                        {
                            id: "app_status",
                            title: "Enable Application",
                            label: "Turn on to activate the application features",
                            type: "switch",
                            default: "yes"
                        },
                        {
                            id: "max_users",
                            title: "Maximum Users",
                            desc: "Set the maximum number of concurrent users allowed",
                            type: "number",
                            placeholder: 100,
                            default: 50
                        },
                        {
                            id: "app_mode",
                            title: "Application Mode",
                            subTitle: "Select the mode in which the application should run",
                            type: "radio",
                            options: {
                                development: "Development",
                                staging: "Staging",
                                production: "Production"
                            },
                            default: "production"
                        }
                    ]
                },
            }
        },
    };

    if (window.reactData) {
        return {
            nonce: window.reactData.nonce,
            settingsApiUrl: window.reactData.settingsApiUrl,
            pluginVersion: window.reactData.pluginVersion,
            logoUrl: window.reactData.logo_url && Object.keys(window.reactData.logo_url).length > 0
                ? window.reactData.logo_url
                : logoURL,
            options: window.reactData.options,
            configs: window.reactData.configs,
            settings: window.reactData.settings && Object.keys(window.reactData.settings).length > 0
                ? window.reactData.settings
                : defaultSettings,
        };
    }

    return {
        nonce: '',
        settingsApiUrl: '',
        pluginVersion: '',
        logoUrl: logoURL,
        options: {},
        configs: {},
        settings: defaultSettings,
    };
}

