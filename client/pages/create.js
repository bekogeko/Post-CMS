import Dashboard from "../components/dashboard-layout";
import useUser from "../hooks/use-user";
import dynamic from "next/dynamic";

import { useState } from "react";

const CustomEditor = dynamic(
  () => import("../components/Editor/index").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function CreatePage() {
  const [editorInstance, setEditorInstance] = useState({});
  const [isReady, setIsReady] = useState(false);
  const handleInstance = (instance) => {
    setEditorInstance(instance);
  };

  return (
    <div key="ContentEditor">
      {CustomEditor && (
        <CustomEditor
          editorRef={setEditorInstance}
          options={{
            placeholder: "Enter for new paragraph",
            autofocus: true,
            /**
             * onReady callback
             */
            onReady: () => {
              setIsReady(true);
              console.count("READY callback");
            },

            /**
             * onChange callback
             */
            onChange: () => {
              console.count("CHANGE callback");
            },
          }}
        ></CustomEditor>
      )}
      <hr></hr>
      <button
        className="border p-2 rounded-md my-2"
        disabled={!isReady}
        onClick={async () => {
          console.log(await editorInstance.save());
        }}
      >
        Save
      </button>
    </div>
  );
}

CreatePage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Create New" username={userData.username}>
      {page}
    </Dashboard>
  );
};
