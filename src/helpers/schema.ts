import { z } from "zod";

export const schema = z.object({
    // journalNumber: z.number({

    //     invalid_type_error: "Account number is required Please enter a Valid Number",
    //     required_error: "Account number is required"
    // }),
    journalNumber: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number({
            invalid_type_error: "Account number is required Please enter a Valid Number",
            required_error: "Account number is required"
        }).positive().min(1)
    ),
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
            debit: z.preprocess(
                (val) => (val === '' ? undefined : Number(val)),
                z.number().min(0, 'Debit must be a positive number').optional()
            ),
            credit: z.preprocess(
                (val) => (val === '' ? undefined : Number(val)),
                z.number().min(0, 'Credit must be a positive number').optional()
            ),
        })
    )
})