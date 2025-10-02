import { required, minLength, maxLength, List, Datagrid, TextField, SimpleForm, TextInput, Create, DeleteButton, ImageInput, ImageField} from "react-admin";
interface Image {
  rawFile?: File;    
  title?: string;    
  src?: string;   
}
interface Data {
  image?: Image;  
  name: String;  
}
export const ClientLogoList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <ImageField source="image" />
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