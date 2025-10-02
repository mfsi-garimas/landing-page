import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, DeleteButton, EditButton, ImageInput, ImageField} from "react-admin";
interface Image {
  rawFile?: File;    
  title?: string;    
  src?: string;   
}
interface Data {
  image?: Image;  
  name: String;  
  company: String;  
  message: String;  
}
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