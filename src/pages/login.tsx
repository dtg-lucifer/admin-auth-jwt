import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";

const Login: NextPage = () => {

	const router = useRouter()

	const { mutate: login, isError } = api.auth.login.useMutation({ 
		onSuccess: () => {
			router.push("/dashboard")
		}
	})

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    return (
		<div className="flex flex-col gap-5 h-screen items-center justify-center bg-gray-200">
			{isError && (<p className="text-red-500">Error</p>)}
            <div className="wrapper flex h-[40vh] w-[40%] flex-col items-center justify-center gap-3 rounded-2xl bg-blue-600 shadow-2xl">
                <input
                    placeholder="Email"
                    value={input.email}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="email"
                    className="w-[40%] rounded-md px-2 py-1 text-lg focus:outline-none"
                />
                <input
                    placeholder="Password"
                    value={input.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    className="w-[40%] rounded-md px-2 py-1 text-lg focus:outline-none"
                />
                <button
                    type="button"
					className="w-[40%] rounded-md bg-white px-2 py-1 text-xl font-semibold uppercase text-black shadow-xl"
					onClick={() => login(input)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Login;
