import { List, Datagrid, TextField, DeleteButton, EditButton} from "react-admin";

export const ContactList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="phone" />
            <TextField source="message" />
        </Datagrid>
    </List>
)