import React, { useState } from "react";
import { extractText } from "../../utils";
import FormInput from "../components/FormInput";
import { useUserInfoContext } from "../context/UserInfoContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { SAVE_USER_PROFILE_INFO } from "../constants/backendRoute.constants";

function OnBoardingPage() {
  // Input tailiwnd class
  const inputClasses =
    "w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors";

  // Input label tailiwnd class
  const labelClasses = "text-sm font-medium text-zinc-400";

  const [pdfText, setPdfText] = useState<{
    resumeText: string;
    coverLetterText: string;
  }>({
    resumeText: "",
    coverLetterText: "",
  });
  const { userInfo } = useUserInfoContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInstance = new FormData(e.currentTarget);
    const newFormObject = Object.fromEntries(formInstance);
    newFormObject["email"] = userInfo.email;
    newFormObject["coverLetterText"] = pdfText.coverLetterText;
    newFormObject["resumeText"] = pdfText.resumeText;
    try {
      console.log(newFormObject);
      await axios.post(
        SAVE_USER_PROFILE_INFO,
        { ...newFormObject },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.log("Error saving the user profile info:", error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        className="flex flex-col gap-8 max-w-xl w-full p-8 bg-zinc-900/30 backdrop-blur border border-zinc-800/50 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-zinc-100 text-center">
          Onboarding
        </h1>

        <FormInput
          labelText="Preferred Job Title"
          inputType="text"
          inputId="preferredJobTitle"
          inputClassName={inputClasses}
          labelClassName={labelClasses}
          inputPlaceholder="e.g. Senior Software Engineer"
        />

        <FormInput
          labelText="Personal Website"
          inputType="url"
          inputId="personalWebsiteLink"
          inputClassName={inputClasses}
          labelClassName={labelClasses}
          inputPlaceholder="https://your-website.com"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput
            labelText="Resume"
            inputType="file"
            inputId="resumeText"
            inputClassName={inputClasses}
            labelClassName={labelClasses}
            inputPlaceholder="Upload Resume"
            inputProps={{
              accept: ".pdf",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                extractText(e, setPdfText, "resumeText"),
            }}
          />

          <FormInput
            labelText="Cover Letter"
            inputType="file"
            inputId="coverLetterText"
            inputClassName={inputClasses}
            labelClassName={labelClasses}
            inputPlaceholder="Upload Cover Letter"
            inputProps={{
              accept: ".pdf",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                extractText(e, setPdfText, "coverLetterText"),
            }}
          />
        </div>

        <FormInput
          labelText="Preferred Job Country"
          inputType="text"
          inputId="preferredJobCountry"
          inputClassName={inputClasses}
          labelClassName={labelClasses}
          inputPlaceholder="e.g. United States"
        />

        <FormInput
          labelText="Folder Name"
          inputType="text"
          inputId="folderName"
          inputClassName={inputClasses}
          labelClassName={labelClasses}
          inputPlaceholder="/Desktop/Resume"
        />

        <FormInput
          labelText="Profile Summary AI"
          inputType="text"
          inputId="profileSummary"
          inputClassName={`${inputClasses}`}
          labelClassName={labelClasses}
          inputProps={{
            defaultValue: "This is an ai generated summary",
            readOnly: true,
          }}
          inputPlaceholder="Auto-generated summary"
        />

        <button
          type="submit"
          className="w-full py-3 px-4 bg-zinc-100 text-zinc-900 font-medium rounded-md hover:bg-zinc-200 active:bg-zinc-300 transition-colors"
        >
          Complete Onboarding
        </button>
      </form>
    </div>
  );
}

export default OnBoardingPage;
