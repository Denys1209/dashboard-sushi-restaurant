"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ComboxProps } from "@/types/Combox"
import { CommandList } from "cmdk"
import { useRouter } from "next/navigation"



export function Combox({ props }: { props: ComboxProps }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

   const handleUpdateParams = (value: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(props.label, value);

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathName, { scroll: false });

    }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? props.listOfValue.find((e) => e.value === value)?.label
            : props.placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {props.listOfValue.map((e) => (
                <CommandItem
                  key={e.value}
                  value={e.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    handleUpdateParams(currentValue);
                    setOpen(false)

                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === e.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {e.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}