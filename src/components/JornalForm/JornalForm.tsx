/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Checkbox, TextField, Typography } from "@mui/material";
import { useEffect, useState, } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { schema } from "../../helpers/schema";
import type { ValidationData } from '../../helpers/interfaces';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';




export default function JornalForm() {
  const [totalDebit, setTotalDebit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const acounts =
    [
      { accounNo: "1" },
      { accounNo: "2" },
      { accounNo: "3" },
      { accounNo: "4" },
      { accounNo: "5" }]


  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      accounts: [],
    },
    resolver: zodResolver(schema),
    mode: "onTouched"
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accounts",

  });


  const watchedFields = useWatch({
    control,
    name: 'accounts',
    defaultValue: [],
  });
  const calcSum = () => {
    const myCreditValues: number[] = []
    const myDebitValues: number[] = []
    watchedFields?.forEach((item) => myCreditValues?.push(Number(item?.credit)))
    watchedFields?.forEach((item) => myDebitValues?.push(Number(item?.debit)))
    setTotalCredit(myCreditValues?.reduce((a, b) => a + b, 0))
    setTotalDebit(myDebitValues?.reduce((a, b) => a + b, 0))

  }

  const addNewrow = () => {
    append({
      accountNumber: "",
      description: "",
      debit: "",
      credit: ""
    })
  }

  const deleteRow = (index: number) => {
    remove(index)
  }

  // Submit form data
  const submitForm = (data: ValidationData) => {
    console.log('Form submitted with data:', data); // Log submitted data
  };



  useEffect(() => {
    calcSum(); // Recalculate totals whenever fields change
  }, [watchedFields]);
  useEffect(() => {
    setDifference(totalDebit - totalCredit)
  }, [totalCredit, totalDebit]);



  return (
    <div className="bg-dark w-100 vh-100">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
        className="editJornal vh-100"
      >

        <Modal.Header content="Edit Jornal" className="mx-3 px-0" closeButton closeVariant='dark' >
          <Modal.Title as={"h1"}>Edit Journal</Modal.Title>
        </Modal.Header>
        <form className="EditJornalForm" onSubmit={handleSubmit(submitForm)}>
          <Modal.Body >

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="formlabel">
                  Journal Number <span className="required"> *</span>
                </label>
                <input type="number" className="form-control myinput border-0 mt-1"
                  {...register("journalNumber", { required: "Journal Number is Required" })} />
                {errors?.journalNumber && <small className="text-danger">{errors?.journalNumber?.message}</small>}

              </div>
              <div className="col-md-6 mb-3 d-flex align-items-center">
                <Checkbox defaultChecked color="secondary" className="ps-0" />
                <Typography component={"span"} color="secondary" className="ms-0 me-3">Print Options</Typography>
                <div className="ms-2 circulerborder active ">
                  <LocalPrintshopOutlinedIcon fontSize="small" className="activeIcon" />
                </div>
                <div className="ms-2 circulerborder ">
                  <EmailOutlinedIcon fontSize="small" className="icon" />
                </div>
                <div className="ms-2 circulerborder ">
                  <PhoneAndroidOutlinedIcon fontSize="small" className="icon" />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="formlabel">
                  Refrences <span className="required"> *</span>
                </label>
                <input className="form-control myinput border-0 mt-1"
                  {...register("refrences", { required: "Refrences Field is Required" })} />
                {errors?.refrences && <small className="text-danger">{errors?.refrences?.message}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="formlabel">
                  Date
                </label>
                <input type="date" className="form-control myinput border-0 mt-1" />
              </div>
              <div className="col-md-12 mb-3">
                <label className="formlabel">
                  Notes <span className="required"> *</span>
                </label>
                <input className="form-control myinput border-0 mt-1"
                  {...register("notes", { required: "Notes Field is Required" })} />
                {errors?.notes && <small className="text-danger">{errors?.notes?.message}</small>}
              </div>
            </div>

            <Table bordered size="xl" className="w-100 mb-0">
              <thead>
                <tr>
                  <th className="w-25">Account Number <span className="text-white"> *</span></th>
                  <th>Description</th>
                  <th className="w-10">Debit</th>
                  <th className="w-10">Credit</th>
                  <th></th>

                </tr>
              </thead>
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
            </Table>


          </Modal.Body>
          <Modal.Footer className=" border-0">
            <Button variant="myVarient" type="submit">Save</Button>
          </Modal.Footer>
        </form>
      </Modal>


    </div >


  )
}


