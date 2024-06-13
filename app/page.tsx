"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <script type="text/javascript">
        {`
          (function(w, d, x, id){
          s=d.createElement('script');
          s.src='https://dtn7rvxwwlhud.cloudfront.net/amazon-connect-chat-interface-client.js';
          s.async=1;
          s.id=id;
          d.getElementsByTagName('head')[0].appendChild(s);
          w[x] =  w[x] || function() { (w[x].ac = w[x].ac || []).push(arguments) };
        })(window, document, 'amazon_connect', '0f2881f8-4930-4f76-9944-187cf9d4f01c');
        amazon_connect('styles', { iconType: 'CHAT_VOICE', openChat: { color: '#ffffff', backgroundColor: '#123456' }, closeChat: { color: '#ffffff', backgroundColor: '#123456'} });
        amazon_connect('snippetId', 'QVFJREFIaWFZYXRVSlpIekdkUUg5YXhZenVQMktKRXNIWTVFQWpBYVErTEdzRnpvZHdHS3dRZEhDc1haVE82OXBQSDlxMGlVQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNU0liQlMzeVZUczdrbTFmOUFnRVFnQ3RuVG9mNWpmU1N2Z3ZMWVU2QmdOb0RuN1NKL0FMcWpENzVuSElDeTRlZEFhU0NxK2QzcG9tZGVCeWM6OlJJU3JkME1yVUtYaFErYTlyMCtiWVJNeFJ0T1JiUG1VNDh3cjB2U2JFdEtsVmh4dGdBdVZlVkNmUGNVMHl4dWo5NVdXTlBYSjVUM0ZhQjd0SExYSGRteW45WGpTTUZISU1RdW12bWpjM1Yxeko0d1dEaDZ5MURXTmxCZTRtVUVOM1Ryak1RUnVWMjZvV1loUjJTOUM4UUNjU0FHQkxmQT0=');
        amazon_connect('supportedMessagingContentTypes', [ 'text/plain', 'text/markdown', 'application/vnd.amazonaws.connect.message.interactive', 'application/vnd.amazonaws.connect.message.interactive.response' ]);
        `}
      </script>
    </main>
  );
}
