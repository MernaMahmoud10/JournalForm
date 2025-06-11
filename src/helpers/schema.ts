import { z } from "zod";

export const schema = z.object({

    journalNumber: z.coerce.number({
        invalid_type_error: "Account number is required Please enter a Valid Number",
        required_error: "Account number is required"
    }).positive().min(1)
    ,
    refrences: z.string({
        required_error: "Refrences is required"
    }).refine(data => data.trim() !== "", {
        message: "Refrences is required",
    }),
    notes: z.string({
        required_error: "Account number is required"
    }).refine(data => data.trim() !== "", {
        message: "Please Enter Notes",
    }),
    accounts: z.array(
        z.object({
            accountNumber: z.string({
                required_error: "Account number is required"
            }).refine(data => data.trim() !== "", {
                message: "Please Select Account Number",
            }),
            description: z.string(),
            credit: z.coerce.number({
                invalid_type_error: 'Credit must be a number',
            }).min(0, 'Credit must be a positive number')
                .optional(),
            debit: z.coerce.number({
                invalid_type_error: 'Credit must be a number',
            }).min(0, 'Credit must be a positive number')
                .optional()

        })
    )
})
export type FormSchemaType = z.infer<typeof schema>;
