"use client"

import {Input} from '@/components/ui/input';
import {FieldSelect} from "@/components/fields/field-select";
import {FieldSwitch} from "@/components/fields/field-switch";
import FieldTags from "@/components/fields/field-tags.tsx";
import {FieldRadio} from "@/components/fields/field-radio.tsx";
import {FieldCheckbox} from "@/components/fields/field-checkbox.tsx";
import {FieldDatetime} from "@/components/fields/field-datetime.tsx";


const handleOtherFields = (field: { type?: any }) => {

    let content;

    switch (field.type) {
        case 'select':
            content = <FieldSelect data={field}/>;
            break;
        case 'switch':
            content = <FieldSwitch data={field}/>;
            break;
        case 'tags':
            content = <FieldTags data={field}/>;
            break;
        case 'radio':
            content = <FieldRadio data={field}/>;
            break;
        case 'checkbox':
            content = <FieldCheckbox data={field}/>;
            break;
        case 'datetime':
            content = <FieldDatetime data={field}/>;
            break;
        default:
            content = <p className="inline py-1.5 px-2.5 text-sm text-red-800 rounded-[500px] bg-red-50">Unsupported field type!</p>;
    }
    return (
        <>{content}</>
    );
}

export function FieldItem(props: { fieldData?: any }) {

    let data = props.fieldData;

    return (
        <div className="flex justify-between w-full gap-[50px] mb-6">
            <div className="w-[50%] title">
                <h3 className="text-sm leading-snug font-medium mb-1">{data.title}</h3>
                <p className="sub-title text-muted-foreground text-sm font-normal">{data.subTitle}</p>
            </div>

            <div className="w-[50%] field text-right">
                <div className="field-item mb-2 flex justify-end">
                    {data.type === 'text' || data.type === 'number' || data.type === 'email' || data.type === 'password' ?
                        (
                            <Input
                                type={data.type}
                                id={data.id}
                                name={data.id}
                                placeholder={data.placeholder}
                            />
                        )
                        :
                        handleOtherFields(data)
                    }
                </div>
                <p className="sub-title text-muted-foreground text-sm font-normal italic">{data.desc}</p>
            </div>
        </div>
    )
}
