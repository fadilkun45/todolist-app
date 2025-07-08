import ModalCustom from '@/components/utilities/modalCustom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';

interface ModalNewInterface {
    isOpen: boolean;
    close: () => void;
    onSubmit: (params: any) => void;
    obj?: any;
}

const ModalNew = ({ isOpen, close, onSubmit, obj }: ModalNewInterface) => {
    const formSchema = z.object({
        name: z.string().min(1, "name is required"),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: obj?.name || "",
        }
    });

    const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
        onSubmit(data);
    };


  
    return (
        <ModalCustom isOpen={isOpen} closeModal={close} title={'add todo'} onClickConfirmButton={form.handleSubmit(handleFormSubmit)}
            confirmButton  >
            <div className="flex flex-col gap-y-3">
                <Form {...form}>
                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-3">
                                <FormLabel className="text-xl">name</FormLabel>
                                <FormControl>
                                    <Input placeholder="input name"  {...field} className="outline-none" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>
        </ModalCustom>
    )
}

export default ModalNew