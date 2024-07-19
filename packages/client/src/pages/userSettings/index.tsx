import React, { useState } from "react";
import { Route } from "../../routes/user.settings";
import { FieldApi, useForm } from "@tanstack/react-form";

export type UserSettingsFormValues = {
  username: string;
  givenName: string | undefined;
  familyName: string | undefined;
};

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="col-span-3">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="block text-sm text-red-600">
          {field.state.meta.errors.join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? (
        <span className="block text-sm text-gray-600 mt-1">Validating...</span>
      ) : null}
    </div>
  );
}

const UserSettings: React.FC = () => {
  const {
    user: { email, username, givenName, familyName },
  } = Route.useLoaderData({});

  const [isEditing, setIsEditing] = useState(false);

  const handleEditSwitch = () => {
    // Todo: focus on the first input field when switching to edit mode

    // Todo 2: deny switching out of edit mode if there are validation errors
    setIsEditing(!isEditing);
  };

  const form = useForm<UserSettingsFormValues>({
    defaultValues: {
      givenName,
      familyName,
      username,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Settings
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your account settings and set preferences.
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex justify-between items-center">
        <span className="text-sm text-gray-700">Enable Editing</span>
        <label
          htmlFor="edit-toggle"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              id="edit-toggle"
              type="checkbox"
              className="sr-only"
              checked={isEditing}
              onChange={handleEditSwitch}
            />
            <div
              className={`block ${isEditing ? "bg-teal-200" : "bg-gray-400"} w-10 h-6 rounded-full`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isEditing ? "transform translate-x-full" : ""}`}
            ></div>
          </div>
        </label>
      </div>
      <div className="border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <dl>
            <div className="min-h-24 bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <form.Field
                name="username"
                validators={{
                  onChange: ({ value }) => {
                    return value.length > 3
                      ? undefined
                      : "Username must be at least 3 characters";
                  },
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  return (
                    <>
                      <label
                        className="text-sm font-medium text-gray-500 md:mb-0 mb-2"
                        htmlFor={field.name}
                      >
                        Username
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full h-8 px-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:mt-0 sm:col-span-2"
                          />
                          <FieldInfo field={field} />
                        </>
                      ) : (
                        <>
                          <dd className="w-full px-3 mt-1 md:mt-0 md:pt-1 text-sm text-gray-900 border border-transparent sm:mt-0 sm:col-span-2">
                            {field.state.value}
                          </dd>
                        </>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="min-h-24 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <>
                {isEditing ? (
                  <>
                    <input
                      id={"email"}
                      name={"email"}
                      value={email}
                      disabled={true}
                      className="w-full h-8 px-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:mt-0 sm:col-span-2"
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <dd className="w-full px-3 mt-1 md:mt-0 md:pt-1 text-sm text-gray-900 border border-transparent sm:mt-0 sm:col-span-2">
                      {email}
                    </dd>
                  </>
                )}
              </>
            </div>
            <div className="min-h-24 bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <form.Field
                name="givenName"
                validators={{
                  onChange: ({ value }) => {
                    return undefined;
                  },
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  return (
                    <>
                      <label
                        className="text-sm font-medium text-gray-500 md:mb-0 mb-2"
                        htmlFor={field.name}
                      >
                        Given name (optional)
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="<empty>"
                            className="w-full h-8 px-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:mt-0 sm:col-span-2"
                          />
                          <FieldInfo field={field} />
                        </>
                      ) : (
                        <>
                          <dd className="w-full px-3 mt-1 md:mt-0 md:pt-1 text-sm text-gray-900 border border-transparent sm:mt-0 sm:col-span-2">
                            {field.state.value || "-"}
                          </dd>
                        </>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="min-h-24 bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <form.Field
                name="familyName"
                validators={{
                  onChange: ({ value }) => {
                    return undefined;
                  },
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  return (
                    <>
                      <label
                        className="text-sm font-medium text-gray-500 md:mb-0 mb-2"
                        htmlFor={field.name}
                      >
                        Family name (optional)
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="<empty>"
                            className="w-full h-8 px-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:mt-0 sm:col-span-2"
                          />
                          <FieldInfo field={field} />
                        </>
                      ) : (
                        <>
                          <dd className="w-full px-3 mt-1 md:mt-0 md:pt-1 text-sm text-gray-900 border border-transparent sm:mt-0 sm:col-span-2">
                            {field.state.value || "-"}
                          </dd>
                        </>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </dl>
        </form>
      </div>
    </div>
  );
};

export const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <UserSettings />
          </div>
        </div>
      </main>
    </div>
  );
};
