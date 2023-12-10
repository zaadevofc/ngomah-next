
import Container from "@/components/Container";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <>
            <Container className="min-h-screen justify-center items-center flex-col">
                <div className="flex flex-col items-center">
                    {/* <img className={'w-28'} src={'/logo.png'} alt={'ngomah logo'} width={200} height={200} /> */}
                    <h1 className="font-bold text-3xl font-['Aoboshi_One'] mb-6">Ngomah</h1>
                    <div className="flex flex-col gap-3 mt-6">
                        <div onClick={() => signIn('google')} className="flex flex-row items-center gap-3 default-btn">
                            <FcGoogle className="drop-shadow-md" />
                            <h1>Login dengan Google</h1>
                        </div>
                        <div className="flex flex-row items-center gap-3 default-btn !bg-gray-500/50 opacity-50 active:scale-100">
                            <FcGoogle className="drop-shadow-md" />
                            <h1>Login dengan Google</h1>
                        </div>
                        <div className="flex flex-row items-center gap-3 default-btn !bg-gray-500/50 opacity-50 active:scale-100">
                            <FcGoogle className="drop-shadow-md" />
                            <h1>Login dengan Google</h1>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login