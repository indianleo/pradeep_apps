import React from "react";
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import io from "socket.io-client";
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = (props)=> {
    const { roomID } = props.route.params;
    const peerRef = React.useRef();
    const socketRef = React.useRef();
    const otherUser = React.useRef();
    const sendChannel = React.useRef(); //Data channel
    const [messages, setMessages] = React.useState([]); // Chats between the peers will be stored here

    React.useEffect(() => {
        // Step 1: Connect with the Signal server
        console.log("Step 1: Connect with the Signal server");
        socketRef.current = io.connect("http://192.168.1.4:9000"); // Address of the Signal server
    
        console.log(socketRef.current.connected);
        // Step 2: Join the room. If initiator we will create a new room otherwise we will join a room
        console.log("Step 2: Join the room");
        socketRef.current.emit("join room", roomID); // Room ID
    
        // Step 3: Waiting for the other peer to join the room
        socketRef.current.on("other user", userID => {
          console.log("the other peer to join the room");
          callUser(userID);
          otherUser.current = userID;
        });
    
        // Signals that both peers have joined the room
        socketRef.current.on("user joined", userID => {
          console.log("on user joined");
          otherUser.current = userID;
        });
    
        socketRef.current.on("offer", handleOffer);
        
        socketRef.current.on("answer", handleAnswer);
    
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
    }, []);

    const callUser  = (userID)=> {
        // This will initiate the call for the receiving peer
        console.log("[INFO] Initiated a callUser")
        peerRef.current = Peer(userID);
        sendChannel.current = peerRef.current.createDataChannel("sendChannel");
        
        // listen to incoming messages from other peer
        sendChannel.current.onmessage = handleReceiveMessage;
    }

    function Peer(userID) {
      console.log("Peer connection called");
        /* 
           Here we are using Turn and Stun server
           (ref: https://blog.ivrpowers.com/post/technologies/what-is-stun-turn-server/)
        */
    
        const peer = new RTCPeerConnection({
          iceServers: [
              {
                  urls: "stun:stun.stunprotocol.org"
              },
              {
                  urls: 'turn:numb.viagenie.ca',
                  credential: 'muazkh',
                  username: 'webrtc@live.com'
              },
             ]
          });
        peer.onicecandidate = handleICECandidateEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);
        return peer;
    }

    function handleNegotiationNeededEvent(userID){
      console.log("handle negotiation event called");
        // Offer made by the initiating peer to the receiving peer.
        peerRef.current.createOffer().then(offer => {
           return peerRef.current.setLocalDescription(offer);
        })
        .then(() => {
          const payload = {
            target: userID,
            caller: socketRef.current.id,
            sdp: peerRef.current.localDescription,
          };
          socketRef.current.emit("offer", payload);
        })
        .catch(err => console.log("Error handling negotiation needed event", err));
    }

    function handleOffer(incoming) {
        /*
          Here we are exchanging config information
          between the peers to establish communication
        */
        console.log("[INFO] Handling Offer")
        peerRef.current = Peer();
        peerRef.current.ondatachannel = (event) => {
          sendChannel.current = event.channel;
          sendChannel.current.onmessage = handleReceiveMessage;
          console.log('[SUCCESS] Connection established')
        }
    
        /*
          Session Description: It is the config information of the peer
          SDP stands for Session Description Protocol. The exchange
          of config information between the peers happens using this protocol
        */
        const desc = new RTCSessionDescription(incoming.sdp);
    
        /* 
           Remote Description : Information about the other peer
           Local Description: Information about you 'current peer'
        */
    
        peerRef.current.setRemoteDescription(desc).then(() => {
        }).then(() => {
          return peerRef.current.createAnswer();
        }).then(answer => {
          return peerRef.current.setLocalDescription(answer);
        }).then(() => {
          const payload = {
            target: incoming.caller,
            caller: socketRef.current.id,
            sdp: peerRef.current.localDescription
          }
          socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message){
        console.log("handle answer");
        // Handle answer by the receiving peer
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log("Error handle answer", e));
    }

    function handleReceiveMessage(e) {
        // Listener for receiving messages from the peer
        console.log("[INFO] Message received from peer", e.data);
        const msg = [{
          _id: Math.random(1000).toString(),
          text: e.data,
          createdAt: new Date(),
          user: {
            _id: 2,
          },
        }];
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
    }

    function handleICECandidateEvent(e) {
      console.log("handle ICE event");
        /*
          ICE stands for Interactive Connectivity Establishment. Using this
          peers exchange information over the intenet. When establishing a
          connection between the peers, peers generally look for several 
          ICE candidates and then decide which to choose best among possible
          candidates
        */
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
      console.log("handle new ICE incoming msg");
        const candidate = new RTCIceCandidate(incoming);
      
        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }
      
    function sendMessage(msg = []) {
        if (sendChannel.current) {
          sendChannel.current.send(msg[0].text);
          setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        }
    }

    return (
        <GiftedChat
            messages = {messages}
            onSend = {msg => sendMessage(msg)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default Chat;