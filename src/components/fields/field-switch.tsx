"use client"

import {Switch} from "@/components/ui/switch"

export function FieldSwitch(field: { data: any; }) {
    let data = field.data;

    return (
        <Switch name={data.id} id={data.id}/>
    )
}
