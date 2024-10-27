
export namespace SocketIO {

  export  interface ServerToClientEvents {
      noArg: () => void;
      basicEmit: (a: number, b: string, c: Buffer) => void;
      withAck: (d: string, callback: (e: number) => void) => void;
      'chat message': (message: string) => void;
    }
    
  export interface ClientToServerEvents {
    'chat message': (message: string) => void;
      hello: () => void;
    }
    
  export  interface InterServerEvents {
      ping: () => void;
    }
    
  export  interface SocketData {
      name: string;
      age: number;
    }
}

