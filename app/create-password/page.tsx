import { CreatePasswordForm } from "./_components/create-password-form";

const CreatePasswordPage = () => {
  return ( 
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-[80%] lg:w-[50%] xl:w-[30%] h-fit flex flex-col gap-10">
        <div className="w-full h-fit flex flex-col gap-3">
          <h1 className="text-2xl text-primary font-extrabold">Defina sua nova senha</h1>
          <p className="text-sm">Esse é um passo único para ativar seu acesso. Crie sua senha e comece a usar o sistema com segurança.</p>
        </div>
        <CreatePasswordForm />
      </div>
    </div>
  );
}

export default CreatePasswordPage;