import {required,minLength,maxLength,List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton} from "react-admin";
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
    return (
        <Edit>
        <SimpleForm>
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