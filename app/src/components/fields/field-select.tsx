"use client"

import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useMemo, useState} from "react";


export function FieldSelect(field: { data: any; }) {
    let data = field.data;

    const options = useMemo(() => {
        return Object.entries(data.options ?? {}) as [string, string][];
    }, [data.options]);

    let initialValue = data.value ?? '';

    if (typeof initialValue === "undefined" || initialValue === null || initialValue === '') {
        initialValue = data.default ?? '';
    }

    // For multiple select, ensure initialValue is an array
    if (data.multiple) {
        if (typeof initialValue === 'string') {
            initialValue = initialValue ? initialValue.split(',') : [];
        } else if (!Array.isArray(initialValue)) {
            initialValue = [];
        }
    }

    const [selectedValue, setSelectedValue] = useState(initialValue);

    const handleValueChange = (value: string) => {
        if (data.multiple) {
            // Toggle selection for multiple
            setSelectedValue((prev: string[]) => {
                if (prev.includes(value)) {
                    return prev.filter((v: string) => v !== value);
                }
                return [...prev, value];
            });
        } else {
            setSelectedValue(value);
        }
    };

    return (
        <>
            {/* Hidden input(s) to ensure value is submitted */}
            {data.multiple ? (
                // Multiple hidden inputs for array values
                Array.isArray(selectedValue) && selectedValue.length > 0 ? (
                    selectedValue.map((val: string, index: number) => (
                        <input
                            key={index}
                            type="hidden"
                            name={`${data.id}[]`}
                            value={val}
                        />
                    ))
                ) : (
                    <input type="hidden" name={`${data.id}[]`} value=""/>
                )
            ) : (
                <input type="hidden" name={data.id} value={selectedValue as string}/>
            )}

            <Select
                value={data.multiple ? undefined : selectedValue as string}
                onValueChange={handleValueChange}
            >
                <SelectTrigger className={data.classes}>
                    <SelectValue placeholder={data.placeholder}>
                        {data.multiple && Array.isArray(selectedValue) && selectedValue.length > 0
                            ? `${selectedValue.length} selected`
                            : undefined
                        }
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            options.map(([key, label]) => {
                                const isSelected = data.multiple
                                    ? Array.isArray(selectedValue) && selectedValue.includes(key)
                                    : selectedValue === key;

                                return (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                        className={isSelected ? 'bg-accent' : ''}
                                    >
                                        {data.multiple && (
                                            <span className="mr-2">
                                                {isSelected ? '✓' : ' '}
                                            </span>
                                        )}
                                        {label}
                                    </SelectItem>
                                );
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}