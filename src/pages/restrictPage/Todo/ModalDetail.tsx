import ModalCustom from '@/components/utilities/modalCustom';
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import MasterApis from '@/services/Masters.apis';
import { toast } from 'react-toastify';

interface ModalDetailProps {
  isOpen: boolean;
  close: () => void;
  onSubmit: (params: any) => void;
  obj?: any;
}

const formSchema = z.object({
  items: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1, "Item name required"),
      itemCompletionStatus: z.boolean().optional(),
    })
  ),
});

const ModalDetail = ({ isOpen, close, onSubmit, obj }: ModalDetailProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const fetchChecklistItems = async () => {
    try {
      const res = await MasterApis.getChecklistItem(`${obj?.id}`);
      const items = res?.data || [];
      replace(items);
    } catch (err) {
      toast.error("Gagal mengambil item checklist");
    }
  };

  useEffect(() => {
    if (isOpen && obj?.id) fetchChecklistItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleAddItem = () => {
    const newIndex = fields.length;
    append({ name: '', itemCompletionStatus: false });
    setEditingIndex(newIndex);
  };

const handleSaveItem = async (index: number, field: any) => {
  const values = form.getValues(`items`);
  const item = values[index];

  if (!item?.name?.trim()) return;

  try {
    if (item.id) {
      await MasterApis.editChecklistItem(obj.id, item.id, { name: item.name });
      toast.success("Item diperbarui");
    } else {
      const res = await MasterApis.postChecklistItem(obj.id, {
        itemName: item.name,
        itemCompletionStatus: false,
      });
      form.setValue(`items.${index}.id`, res.data.id); // inject id to field
      toast.success("Item ditambahkan");
    }
    setEditingIndex(null);
  } catch (err) {
    toast.error("Gagal menyimpan item");
  }
};

  const handleDeleteItem = async (index: number, itemId?: number) => {
    try {
      if (itemId) {
        await MasterApis.deleteChecklistItem(obj.id, itemId);
        toast.success("Item dihapus");
      }
      remove(index);
      if (editingIndex === index) setEditingIndex(null);
    } catch (err) {
      toast.error("Gagal menghapus item");
    }
  };


  return (
    <ModalCustom
      isOpen={isOpen}
      closeModal={() => {
        setEditingIndex(null);
        close();
      }}
      title={`Checklist: ${obj?.name}`}
      confirmButton={false}
    >
      <div className="flex flex-col gap-y-5">
        <Form {...form}>
          {/* Checklist Items */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md font-semibold">Checklist Items</p>
              <Button type="button" size="sm" onClick={handleAddItem}>
                + Add Item
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm italic text-gray-400">No items yet.</p>
            )}

            {fields.map((field, index) => (
              <div key={field.id ?? index} className="flex gap-2 items-center">
                {editingIndex === index ? (
                  <>
                    <Input
                      autoFocus
                      {...form.register(`items.${index}.name` as const)}
                      placeholder={`Item ${index + 1}`}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          await handleSaveItem(index, field);
                        }
                        if (e.key === 'Escape') {
                          setEditingIndex(null);
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => handleSaveItem(index, field)}>Simpan</Button>
                  </>
                ) : (
                  <div
                    className="flex-1 p-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => setEditingIndex(index)}
                  >
                    { field?.itemName || field.name}
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteItem(index, field.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Form>
      </div>
    </ModalCustom>
  );
};

export default ModalDetail;
