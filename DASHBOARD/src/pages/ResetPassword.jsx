import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './subComponents/SpecialLoadingButton'
import { Button } from "../components/ui/button.jsx"
import { Card, CardContent } from "../components/ui/card.jsx"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../components/ui/field.jsx"
import { Input } from "../components/ui/input.jsx"
import { cn } from '@/lib/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllForgotPasswordErrors, resetPassword } from '@/store/slices/forgotResetPasswordSlice.js'
import { toast } from 'react-toastify'
import { getUser } from '@/store/slices/userSlice'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = useParams();
  const {loading,error,message} = useSelector((state) => state.forgotResetPassword)
  const {isAutenticated} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password, confirmPassword));
  };
  useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearAllForgotPasswordErrors());
      }
      if(isAutenticated){
        navigateTo('/');
      }
      if(message !== null){
        toast.success(message);
        dispatch(getUser());
      }
    },[dispatch,error,isAutenticated,loading])
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your new password below
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                {
                  loading ? <SpecialLoadingButton content={"Resetting Password"}/> : <Button type="submit" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                }
              </Field>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
      </div>
    </div>
  )
}

export default ResetPassword