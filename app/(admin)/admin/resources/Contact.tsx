import { List, Datagrid, TextField} from "react-admin";

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