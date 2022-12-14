import {Button, Grid, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {MoneyType} from "../../model/moneyType";
import {AddMoneyFormOptions} from "../../data/AddMoneyForm/AddMoneyFormOptions";
import {useDispatch} from "react-redux";
import {addMoney} from "../../redux/slice/moneySlice";
import AddMoneyFormDialog from "./AddMoneyFormDialog";

const AddMoneyForm = (): JSX.Element => {
    const [disabled, setDisabled] = useState<boolean>(true)
    const [openDialog,setOpenDialog] = useState<boolean>(false)
    const [form, setForm] = useState<MoneyType>({
        id: Math.floor(Math.random() * 1000),
        type: '',
        title: '',
        price: ''
    })
    const dispatch = useDispatch()

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    },[form])

    const handleSubmit = () => {
        dispatch(addMoney(form))
        setOpenDialog(true)
    }

    useEffect(() => {
        setDisabled(form.title === '' || form.price === '' || form.type === '')
    }, [form])

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12}>
                <Grid item xs={12} md={4} p={2}>
                    <TextField name={'type'} onChange={handleChange} select value={form.type} fullWidth
                               label={'نوع دخل و خرج'} SelectProps={{native: true}}>
                        {AddMoneyFormOptions.map(o => (
                            <option key={o.id} value={o.value}>
                                {o.title}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <TextField name={'title'} onChange={handleChange} value={form.title} fullWidth label={'موضوع'}/>
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <TextField type={'number'} name={'price'} onChange={handleChange} value={form.price} fullWidth
                               label={'مبلغ'}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant={'contained'} disabled={disabled}
                        color={form.type === 'income' ? 'success' : 'error'} onClick={handleSubmit}>
                    اضافه کردن {form.type === 'income' ? 'دخل' : 'خرج'}
                </Button>
            </Grid>
            <AddMoneyFormDialog open={openDialog}/>
        </Grid>
    )
}

export default AddMoneyForm