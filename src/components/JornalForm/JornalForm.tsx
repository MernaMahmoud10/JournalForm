import FormInputsComponent from "./FormInputsComponent";
import TableBBody from "./TableBBody";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { schema, type FormSchemaType } from "../../helpers/schema";


export default function JornalForm() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormSchemaType>({
    defaultValues: {
      accounts: [],
    },
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const watchedFields = useWatch({
    control,
    name: 'accounts',
    defaultValue: [],
  });

  const totalCredit = watchedFields.reduce((sum, item) => sum + Number(item?.credit || 0), 0);
  const totalDebit = watchedFields.reduce((sum, item) => sum + Number(item?.debit || 0), 0);
  const difference = totalDebit - totalCredit

  // Submit form data
  const submitForm = (data: FormSchemaType) => {
    console.log('Form submitted with data:', data); // Log submitted data
  };

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
            <FormInputsComponent register={register} errors={errors} />
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
              <TableBBody control={control} difference={difference}
                errors={errors} register={register} totalCredit={totalCredit} totalDebit={totalDebit} />
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


