/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import ModalNew from './ModalNew';
import loadingStore from '@/store/LoadingStore';
import MasterApis from '@/services/Masters.apis';
import { toast } from 'react-toastify';
import ModalDetail from './ModalDetail';

const Todo = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [detailData, setDetailData] = useState<any>(null);
  const [listData, setListData] = useState<any>([]);
  const setLoading = loadingStore((state) => state.setLoading);

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const res = await MasterApis.getChecklist();
      setListData(res?.data);
    } catch (error) {
      toast.error("Failed to fetch checklist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await MasterApis.postChecklist(data);
      toast.success("Create list success");
      setShowModalAdd(false);
      fetchChecklist();
    } catch (error) {
      toast.error("Failed to create checklist");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await MasterApis.deleteChecklist(id);
      toast.success("Checklist deleted");
      fetchChecklist();
    } catch (error) {
      toast.error("Failed to delete checklist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModalAdd && (
        <ModalNew
          obj={detailData}
          onSubmit={handleSubmit}
          isOpen={showModalAdd}
          close={() => setShowModalAdd(false)}
        />
      )}

      {showModalDetail && (
        <ModalDetail
          obj={detailData}
          onSubmit={handleSubmit}
          isOpen={showModalDetail}
          close={() => setShowModalDetail(false)}
        />
      )}

      <div className="flex justify-end p-4">
        <button
          className="bg-brand-200 hover:bg-brand-100 cursor-pointer text-white px-4 py-2 rounded"
          onClick={() => {
            setDetailData(null);
            setShowModalAdd(true);
          }}
        >
          + Tambah Checklist
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {listData?.map((note: any) => (
          <div
            onClick={() => { setShowModalDetail(true); setDetailData(note) }}
            key={note.id}
            className={`p-4 rounded-xl shadow bg-white relative border`}
          >
            <button
              className="absolute z-50 top-2 right-2 text-sm text-red-500 hover:text-red-700"
              onClick={(e) => { e.stopPropagation(); handleDelete(note.id) }}
            >
              ✕
            </button>

            <h2 className="font-semibold text-lg mb-2">{note.name}</h2>

            {note.items && note.items.length > 0 ? (
              <ul className="space-y-1" >
                {note.items.map((item: any) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={item.itemCompletionStatus}
                      readOnly
                    />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No items.</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
