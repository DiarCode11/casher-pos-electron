import Navbar from "@/components/shared/navbar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react";

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

export default function Sales() {
    return (
        <div className="flex h-screen flex-col">
            <Navbar>
                <h1 className="px-4 text-xl">Penjualan</h1>
            </Navbar>
            <div className="flex flex-1 overflow-y-auto p-3 pb-3 gap-4">
                <div className="flex-1">
                    <div className=" w-full rounded-xl shadow-sm bg-white p-3 flex gap-3">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Cari menu..." className="pl-9 w-full" />
                        </div>
                        <Select items={items}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                {item.label}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="h-full w-[350px] rounded-xl bg-white shadow-md p-5">
                    <h1>Invoice</h1>
                </div>
            </div>
        </div>
    )
}