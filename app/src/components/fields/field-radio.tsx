"use client"

import {Label} from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {useMemo} from "react";

export function FieldRadio(field: { data: any; }) {
    let data = field.data;

    const options = useMemo(() => {
        return Object.entries(data.options ?? {}) as [string, string][];
    }, [data.options]);

    let value = data.value ?? '';

    if (typeof value === "undefined" || value === null || value === '') {
        value = data.default ?? '';
    }

    return (
        <RadioGroup defaultValue={value} name={data.id} id={data.id}>
            {
                options.map(([key, label]) => (
                    <div key={key} className="flex items-center gap-3">
                        <RadioGroupItem value={key} id={key}/>
                        <Label className="cursor-pointer" htmlFor={key}>{label}</Label>
                    </div>
                ))
            }
        </RadioGroup>
    )
}
