import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Input from "./../../Atoms/Inputs/Modal/Input";
import Select from "../../Atoms/Inputs/Modal/Select";
import { useAppDispatch, useAppSelector } from "./../../../App/Hooks/Hooks";
import { getDataNum } from "./../../../App/Action/Action";

interface Props {
  active: boolean;
}

const inputs = [
  { ph: "Documento", type: "Number", span: "#" },
  { ph: "Nombre", type: "Text", span: "" },
  { ph: "Apellido", type: "Text", span: "" },
  { ph: "Correo", type: "Text", span: "" },
  { ph: "Telefono", type: "Number", span: "+57" },
  { ph: "Ciudad", type: "Text", span: "" },
  { ph: "Codigo Postal", type: "Number", span: "" },
];

function Modal() {
  const { country } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(getDataNum());
  }, []);

  let d = country.data

 console.log()
  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">PASARELA DE PAGO</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={openModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    {inputs.map((d) => (
                      <div className="mt-3 mb-3">
                        {d.type === "Number" && d.span.length ? (
                          <Select placeholder={d.ph} span={d.span} option={''}/>
                        ) : (
                          <Input type={d.type} placeholder={d.ph} />
                        )}
                      </div>
                    ))}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;