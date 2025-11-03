"use client"

import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label"
import {useMemo} from "react";

export function FieldCheckbox(field: { data: any; }) {
    let data = field.data;

    const options = useMemo(() => {
        return Object.entries(data.options ?? {}) as [string, string][];
    }, [data.options]);

    let value = data.value ?? '';

    if (typeof value === "undefined" || value === null || value === '') {
        value = data.default ?? '';
    }

    return (
        <div id={data.id}>
            {
                options.map(([key, label]) => (
                    <div key={key} className="flex items-center gap-3 mb-2">
                        <Checkbox id={key}/>
                        <Label className="cursor-pointer" htmlFor={key}>{label}</Label>
                    </div>
                ))
            }
        </div>
    )
}
