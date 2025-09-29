import { required, minLength, maxLength, List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton, ImageInput, ImageField} from "react-admin";

export const ClientLogoList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <ImageField source="image" />
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

export const ClientLogoCreate = () => (
    <Create transform={transform}>
        <SimpleForm>
            <TextInput source="name" validate={[required(), minLength(5), maxLength(10)]}  fullWidth/>
            <ImageInput
                source="image"
                label="Client Logo"
                accept={"image/*" as any}
                fullWidth validate={[required()]} >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
)