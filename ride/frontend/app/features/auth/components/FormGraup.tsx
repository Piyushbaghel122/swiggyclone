

export default function Formgroup({ type, value , placeholder , onChange  }: { type:string , value:string , placeholder: string , onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
     
   return (
    <div>
     <input
     type={type}
     value={value}
     placeholder={placeholder}
     onChange={onChange}
      />
    </div>
   )
}
