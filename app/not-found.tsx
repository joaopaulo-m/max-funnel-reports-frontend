import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-[80%] lg:w-[50%] xl:w-[30%] h-fit flex flex-col gap-6">
        <Image 
          alt="Logo"
          src="/logo-sm.png"
          width={72}
          height={72}
        />
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl text-primary font-bold'>Ops! Página não encontrada</h1>
          <h4 className='text-sm text-foreground/80'>
            Parece que você se perdeu no caminho. Verifique o link ou <Link className='font-semibold text-primary underline' href="/">volte para a página inicial.</Link>
          </h4>
        </div>
      </div>
    </div>
  )
}