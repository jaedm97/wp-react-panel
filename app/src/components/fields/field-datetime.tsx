"use client"

import * as React from "react"
import {ChevronDownIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function FieldDatetime(field: { data: any; }) {
    let data = field.data,
        settings = data.settings ?? {};

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [time, setTime] = React.useState<string>("10:30:00")

    const formatDateForInput = (date: Date | undefined) => {
        if (!date) return "";
        return date.toISOString().split('T')[0];
    }

    // Combine date and time into ISO string if needed
    const getDateTimeValue = () => {
        if (!date) return "";
        if (settings.timePicker) {
            return `${formatDateForInput(date)} ${time}`;
        }
        return formatDateForInput(date);
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id={`date-picker-${data.id}`} className="w-auto justify-between font-normal hover:bg-white">
                            {date ? date.toLocaleDateString() : data.placeholder}
                            <ChevronDownIcon/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
                <input type="hidden" name={data.id} value={getDateTimeValue()}/>
            </div>
            {
                settings.timePicker && settings.timePicker
                    ? (
                        <div className="flex flex-col gap-3">
                            <Input
                                type="time"
                                id={`time-picker-${data.id}`}
                                name={`${data.id}_time`}
                                step="1"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                        </div>
                    )
                    : <></>
            }

        </div>
    )
}
