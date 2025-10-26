import { useMemo, useRef, useState } from "react"
import { FormGrp } from "../formGroup/formGroup";
import { loginConfig } from "../../config/loginConfig";
import { useNavigate } from "react-router-dom";
import { useUpdateDataMutation } from "../../api-services";
import { showToast } from "../showToast";
import { setToken } from "../../helper/utils";
import { Button } from "../button";
import { SizeEnum } from "../../helper/enum";

const Login = () => {
    const loginRef = useRef(null);
    const navigate = useNavigate();
    const [update] = useUpdateDataMutation();
    const [loading, setLoading] = useState(false)
    const config = useMemo(() => {
        return loginConfig()
    }, [])

    const handleLogin = async (evt: any) => {
        evt.preventDefault();
        setLoading(true);
        try {
            const { identifier, password } = loginRef?.current?.formik?.values;
            const params = {
                // name: { url: 'signup' },
                body: {
                    identifier,
                    password
                },
                __config__: {
                    url: 'login',
                    invalidatesTags: () => []
                }
            }

            const res = await update(params);

            if (res?.data?.status === "Success") {
                const message = res?.data?.message;
                const data = res?.data.data;
                setToken(data);
                showToast(message, "success");
                setTimeout(() => {
                    navigate('/todos')
                }, 2000);
            } else {
                const message = res?.error?.data?.message;
                showToast(message, "error");
            }
        } catch (error: any) {
            showToast(error?.message || "Network error", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className='w-[300px] h-auto m-8  rounded shadow border border-gray-300 bg-white'>
                    <div className="flex justify-center font-bold text-lg text-form-default mt-4">Sign in</div>
                    <div>
                        <FormGrp group={config} ref={loginRef} />
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-center">
                            <Button
                                type="button"
                                className={`w-1/3 ${loading ? '!bg-primary !opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                size={SizeEnum.Small}
                                onClick={handleLogin}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>

                        <div className="text-form-default text-xs mt-2 text-center">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-primary hover:text-primaryHover">
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
