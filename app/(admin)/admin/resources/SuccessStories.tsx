import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton, ImageInput, ImageField} from "react-admin";
interface Image {
  rawFile?: File;    
  title?: string;    
  src?: string;   
}
interface Data {
  image?: Image;  
  title: String;  
  summary: String;  
  description: String;  
}
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

const transform = async (data: Data) => {
    if (data && data.image) {
        const reader = new FileReader();
        const img = data.image;
        const rawFile = img.rawFile;
        
        if (rawFile) {
            const base64 = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(rawFile as File);
            });

            data.image = { src: base64, title: img.title };
        }
    }
    return data;
};

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