import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { Checkbox, Typography } from '@mui/material';
import type { ValidationData } from '../../helpers/interfaces';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface IProps {
    register: UseFormRegister<ValidationData>,
    errors: FieldErrors<ValidationData>
}

export default function FormInputsComponent({ register, errors }: IProps) {
    return (
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
    )
}
