import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton, ImageInput, ImageField} from "react-admin";

export const SuccessStoriesList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
)

const transform = async (data: any) => {
    if (data.image?.rawFile) {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(data.image.rawFile);
      });

      data.image = { src: base64, title: data.image.title };
    }
    return data

}

export const SuccessStoriesEdit = () => (
    <Edit transform={transform}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="summary" />
            <TextInput source="description" multiline fullWidth />
            <ImageInput
                source="image"
                label="Image"
                accept={"image/*" as any}
                fullWidth >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
)

export const SuccessStoriesCreate = () => (
    <Create transform={transform}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="summary" />
            <TextInput source="description" multiline fullWidth />
            <ImageInput
                source="image"
                label="Image"
                accept={"image/*" as any}
                fullWidth >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
)