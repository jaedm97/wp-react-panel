"use client"

import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useMemo} from "react";


export function FieldSelect(field: { data: any; }) {
    let data = field.data;

    const options = useMemo(() => {
        return Object.entries(data.options ?? {}) as [string, string][];
    }, [data.options]);

    return (
        <Select name={data.id}>
            <SelectTrigger className={data.classes}>
                <SelectValue placeholder={data.placeholder}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        options.map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
