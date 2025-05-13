import { CreateNewPasswordForm } from "./_components/create-new-password-form";

const CreateNewPasswordPage = () => {
  return ( 
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-[80%] lg:w-[50%] xl:w-[30%] h-fit flex flex-col gap-10">
        <div className="w-full h-fit flex flex-col gap-3">
          <h1 className="text-2xl text-primary font-extrabold">📩 Enviamos um e-mail com um código de verificação.</h1>
          <p className="text-sm">Acesse sua caixa de entrada, copie o código recebido, cole no campo abaixo e crie uma nova senha para recuperar o acesso à sua conta.</p>
        </div>
        <CreateNewPasswordForm />
      </div>
    </div>
  );
}

export default CreateNewPasswordPage;