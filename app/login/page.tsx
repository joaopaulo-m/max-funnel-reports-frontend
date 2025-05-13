import Image from "next/image";
import { LoginForm } from "./_components/login-form";

const LoginPage = () => {
  return ( 
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-[80%] lg:w-[50%] xl:w-[30%] h-fit flex flex-col gap-10">
        <Image 
          alt="Logo"
          src="/logo-sm.png"
          width={72}
          height={72}
        />
        <div className="w-full h-fit flex flex-col gap-3">
          <h1 className="text-2xl text-primary font-extrabold">Vamos turbinar seus relatórios?</h1>
          <p className="text-sm">Entre na sua conta e comece a acompanhar seus clientes e resultados de um jeito simples e poderoso.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;