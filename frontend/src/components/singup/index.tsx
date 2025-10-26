import { useMemo, useRef, useState } from "react"
import { signupConfig } from "../../config/signupConfig"
import { FormGrp } from "../formGroup/formGroup"
import { useUpdateDataMutation } from "../../api-services";
import { showToast } from "../showToast";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { SizeEnum } from "../../helper/enum";

const Singup = () => {
    const signupRef = useRef(null);
    const navigate = useNavigate()
    const [update] = useUpdateDataMutation();
    const [loading, setLoading] = useState(false);
    
    const config = useMemo(() => {
        return signupConfig()
    }, [])

    const handleSignup = async (evt: any) => {
        evt.preventDefault();
        setLoading(true);

        try {
            const { username, email, password } = signupRef?.current?.formik?.values;
            const params = {
                body: { username, email, password },
                __config__: {
                    url: 'signup',
                    invalidatesTags: () => []
                }
            };

            const res = await update(params);

            if (res?.data?.status === "Success") {
                showToast(res.data.message, "success");
                navigate('/login');
            } else {
                showToast(res?.error?.data?.message || "Signup failed", "error");
            }
        } catch (error: any) {
            showToast(error?.message || "Network error", "error");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className='w-[300px] h-auto m-8  rounded shadow border border-gray-300 bg-white'>
                    <div className="flex justify-center font-bold text-lg text-form-default mt-4">Sign up</div>
                    <div>
                        <FormGrp group={config} ref={signupRef} />
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-center">
                             <Button
                                type="button"
                                className={`w-1/3 ${loading ? '!bg-primary !opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                size={SizeEnum.Small}
                                onClick={handleSignup}
                            >
                                {loading ? "Signing up..." : "Sign Up"}
                            </Button>
                        </div>

                        <div className="text-form-default text-xs mt-2 text-center">
                            Already have an account?{" "}
                            <a href="/login" className="text-primary hover:text-primaryHover">
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Singup
