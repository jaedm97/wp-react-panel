"use client"

import {
    Tags,
    TagsContent,
    TagsEmpty,
    TagsGroup,
    TagsInput,
    TagsItem,
    TagsList,
    TagsTrigger,
    TagsValue,
} from '@/components/ui/shadcn-io/tags';
import {CheckIcon, PlusIcon} from 'lucide-react';
import {useState} from 'react';

const FieldTags = (field: { data: any; }) => {
    let data = field.data,
        defaultArgs = data.default ?? [],
        defaultTags = defaultArgs.map((item: any) => ({id: item, label: item}));

    const [selected, setSelected] = useState<string[]>(defaultArgs);
    const [newTag, setNewTag] = useState<string>('');
    const [tags, setTags] = useState<{ id: string; label: string }[]>(defaultTags);
    const handleRemove = (value: string) => {
        if (!selected.includes(value)) {
            return;
        }
        setSelected((prev) => prev.filter((v) => v !== value));
    };
    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            handleRemove(value);
            return;
        }
        setSelected((prev) => [...prev, value]);
    };
    const handleCreateTag = () => {
        setTags((prev) => [
            ...prev,
            {
                id: newTag,
                label: newTag,
            },
        ]);
        setSelected((prev) => [...prev, newTag]);
        setNewTag('');
    };

    let placeholder = data.placeholder ?? 'Start typing to create new';

    return (
        <>
            <Tags className="text-right">
                <TagsTrigger>
                    {selected.map((tag) => (
                        <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
                            {tags.find((t) => t.id === tag)?.label}
                        </TagsValue>
                    ))}
                </TagsTrigger>
                <TagsContent>
                    <TagsInput name={data.id} onValueChange={setNewTag} placeholder={placeholder}/>
                    <TagsList>
                        <TagsEmpty>
                            <button
                                className="mx-auto flex cursor-pointer items-center gap-2"
                                onClick={handleCreateTag}
                                type="button"
                            >
                                <PlusIcon className="text-muted-foreground" size={14}/>
                                Create new tag: {newTag}
                            </button>
                        </TagsEmpty>
                        <TagsGroup>
                            {tags.map((tag) => (
                                <TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}>
                                    {tag.label}
                                    {selected.includes(tag.id) && (
                                        <CheckIcon className="text-muted-foreground" size={14}/>
                                    )}
                                </TagsItem>
                            ))}
                        </TagsGroup>
                    </TagsList>
                </TagsContent>
            </Tags>
            {
                selected.map((tag) => (
                    <input key={tag} type="hidden" name={`${data.id}[]`} value={tag}/>
                ))
            }
        </>
    );
};
export default FieldTags;