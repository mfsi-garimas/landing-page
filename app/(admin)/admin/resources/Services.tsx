import {required,minLength,maxLength,List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton, useNotify} from "react-admin";
export const ServiceList = () => (
    <List >
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
)

export const ServiceEdit = () => {
    const notify = useNotify();
    return (
        <Edit>
        <SimpleForm onError={(error) => {
            console.log('gg'+error)
                    notify(`Error: ${error}`, { type: 'error' });
                }}>
            <TextInput source="title"  fullWidth/>
            <TextInput source="summary" validate={[required(), minLength(5), maxLength(150)]} multiline fullWidth  />
            <TextInput source="description" multiline fullWidth />
        </SimpleForm>
        </Edit>
    )
}

export const ServiceCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title"  fullWidth/>
            <TextInput source="summary" multiline fullWidth />
            <TextInput source="description" multiline fullWidth />
        </SimpleForm>
    </Create>
)