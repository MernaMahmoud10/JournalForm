import { Autocomplete, TextField } from "@mui/material";
import { useFieldArray, Controller, type UseFormRegister, type FieldErrors, type Control } from 'react-hook-form';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { acounts } from "../../data/dummyData";
import type { FormSchemaType } from "../../helpers/schema";


interface Iprops {
    control: Control<FormSchemaType>;
    register: UseFormRegister<FormSchemaType>;
    errors: FieldErrors<FormSchemaType>;
    difference: number;
    totalCredit: number
    totalDebit: number
}
export default function TableBBody({ control, errors, register, difference, totalCredit, totalDebit }: Iprops) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "accounts",

    });
    
    const addNewrow = () => {
        append({
            accountNumber: "",
            description: "",
            debit: 0,
            credit: 0
        })
    }

    const deleteRow = (index: number) => {
        remove(index)
    }

    return (
        <tbody>
            {fields?.map((_row, index) =>
                <tr key={index}>
                    <td>
                        <Controller
                            name={`accounts.${index}.accountNumber`}
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    disablePortal
                                    options={acounts} // Assuming 'acounts' is passed as a prop
                                    getOptionLabel={(option) => option?.accounNo}
                                    value={acounts.find(option => option?.accounNo === field.value) || null}
                                    onChange={(_, value) => field.onChange(value?.accounNo || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            {...field}
                                            variant="standard"
                                            sx={{
                                                '.MuiInputBase-root': {
                                                    input: { fontSize: '0.85rem', '::placeholder': { fontSize: '0.85rem' } },
                                                    '::before': { border: 'none' },
                                                },
                                            }}
                                            placeholder="Search Accounts"
                                        />
                                    )}
                                />
                            )}
                        />
                        {errors?.accounts?.[index]?.accountNumber && <small className="text-danger">{errors?.accounts?.[index]?.accountNumber?.message}</small>}
                    </td>
                    <td>
                        <input
                            className="border-0 bg-transparent w-100"
                            placeholder="Enter Description"
                            {...register(`accounts.${index}.description`)}
                        />
                        {errors?.accounts?.[index]?.description && <small className="text-danger">{errors?.accounts?.[index]?.description?.message}</small>}

                    </td>
                    <td className="creditTd">
                        <input
                            className="border-0 bg-transparent w-100"
                            placeholder="0"
                            {...register(`accounts.${index}.debit`)}
                        />
                        {errors?.accounts?.[index]?.debit && <small className="text-danger">{errors?.accounts?.[index]?.debit?.message}</small>}

                    </td>
                    <td className="creditTd">
                        <input
                            className="border-0 bg-transparent w-100"
                            placeholder="0"
                            {...register(`accounts.${index}.credit`)}
                        />
                        {errors?.accounts?.[index]?.credit && <small className="text-danger">{errors?.accounts?.[index]?.credit?.message}</small>}

                    </td>
                    <td className="text-center cursor-pointer" onClick={() => deleteRow(index)}>
                        <RiDeleteBin5Line color="#aca8a8" fontSize={"larger"} /></td>
                </tr>
            )}
            <tr>
                <td className="text-center py-2" colSpan={5} onClick={addNewrow}>
                    <h6 className="newRow my-1"><FaPlus className="me-3" />Add New Row</h6>
                </td>
            </tr>
            <tr>
                <td className="totalColor tdColSpan py-2 text-center py-2" colSpan={2}>
                    <h6 className="me-5 pe-5 my-1 formlabel">Total</h6>
                </td>
                <td className="totalColor tdColSpan py-2  py-2 text-center" colSpan={1}>
                    <span className="formlabel">{totalDebit}</span>
                </td>
                <td className="totalColor tdColSpan py-2  py-2 text-center" colSpan={1}>
                    <span className="formlabel">{totalCredit}</span>
                </td>
                <td className="totalColor py-2"></td>

            </tr>
            <tr>
                <td className="tdColSpan py-2 text-center py-2 differentColor border-0" colSpan={2}>
                    <h6 className="me-5 pe-5 my-1 formlabel">Difference</h6>
                </td>
                <td className="tdColSpan py-2  text-center py-2 differentColor" colSpan={2}>
                    <span className="formlabel">{difference != 0 ? difference > 0 ? `${difference} Debit` : `${difference * -1} Credit` : difference}</span>
                </td>
                <td className="py-2 differentColor border-0"></td>

            </tr>

        </tbody>
    )
}
