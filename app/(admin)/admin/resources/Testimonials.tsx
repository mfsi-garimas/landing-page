import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton, ImageInput, ImageField} from "react-admin";

export const TestimoniaList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="company" />
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

export const TestimonialEdit = () => (
    <Edit transform={transform}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="company" />
            <TextInput source="message" />
            <ImageInput
                source="image"
                label="Testimonial Logo"
                accept={"image/*" as any}
                fullWidth >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
)

export const TestimonialCreate = () => (
    <Create transform={transform}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="company" />
            <TextInput source="message" />
            <ImageInput
                source="image"
                label="Logo"
                accept={"image/*" as any}
                fullWidth >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
)