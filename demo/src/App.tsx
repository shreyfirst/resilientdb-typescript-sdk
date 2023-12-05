import { Button, Card, CardBody, Code, Heading, Input } from '@chakra-ui/react';
import { IconHash, IconKey, IconLoader2, IconPlus, IconRefresh } from '@tabler/icons-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FetchClient, ResilientDB, RetrieveTransaction } from 'resilientdb-javascript-sdk';
import './App.css';
import PostTransactionModal from './PostTransactionModal';

function attemptJSONPrettify(s: string) {
  try {
    const parsed = JSON.parse(s.replace(/'/g, "\""));
    return JSON.stringify(parsed, null, 2).replace(/ /g, "\u00A0")
  } catch (e: unknown) {
    return s;
  }
}

function App() {
  const [transactions, setTransactions] = useState<RetrieveTransaction[]>([]);

  const clientRef = useRef(new ResilientDB("https://cloud.resilientdb.com", new FetchClient()));

  const [currentPage, setCurrentPage] = useState(0);
  const paginatedTransactions = useMemo(() => {
    const paginatedTransactions: RetrieveTransaction[][] = [];
    let currentPage = [];

    for (let i = 0; i < transactions.length; i++) {
      currentPage.push(transactions[i]);

      if (currentPage.length > 15) {
        paginatedTransactions.push(currentPage);
        currentPage = [];
      }
    }

    paginatedTransactions.push(currentPage);

    setCurrentPage(0);

    return paginatedTransactions;
  }, [transactions]);


  const [ownerPublicKey, setOwnerPublicKey] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [loading, setLoading] = useState(false);
  const handleTransactions = useCallback(async () => {
    setLoading(true);
    const response = await clientRef.current.getFilteredTransactions({
      ownerPublicKey: ownerPublicKey.length === 0 ? null : ownerPublicKey,
      recipientPublicKey: recipientPublicKey.length === 0 ? null : recipientPublicKey
    });
    setTransactions(response);
    setLoading(false);
  }, [ownerPublicKey, recipientPublicKey]);

  const [postTransactionModalOpen, setPostTransactionModalOpen] = useState(false);

  return (
    <>
      <Heading>
        ResilientDB JavaScript SDK Demo
      </Heading>

      This demo implements an incredibly basic transaction explorer of the cloud ResilientDB instance at <Code>https://cloud.resilientdb.com</Code>

      <div className="mt-16">
        <Heading size={"md"} className="flex gap-2">
          Filters
        </Heading>
        <form>
          <label className="font-semibold block mb-0.5">
            Owner Public Key
          </label>
          <Input placeholder='No filter' onChange={e => setOwnerPublicKey(e.currentTarget.value)}/>

          <label className="font-semibold block mb-0.5 mt-2">
            Recipient Public Key
          </label>
          <Input placeholder='No filter' onChange={e => setRecipientPublicKey(e.currentTarget.value)} />
        </form>
      </div>

      <div className="flex justify-between mt-4 mb-2">
        <Heading size={"lg"} className="flex gap-2">
          Queried Transactions
          <Button onClick={handleTransactions} className="gap-2"><IconRefresh /> Refresh</Button>
        </Heading>

        <Button onClick={() => setPostTransactionModalOpen(true)} className="gap-2"><IconPlus /> Post Transaction</Button>
      </div>

      <div className="flex justify-between items-center w-full sticky top-0 z-10 py-2 bg-white">
        <Button onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}>Prev</Button>

        <div>Page {currentPage + 1} / {paginatedTransactions.length}</div>

        <Button onClick={() => setCurrentPage(Math.min(currentPage + 1, transactions.length - 1))}>Next</Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col gap-1 items-center">
            <IconLoader2 className="animate-spin" size="2rem"/>
            Loading...
          </div>
        ) : paginatedTransactions[currentPage].map(transaction => (
          <Card key={transaction.id}>
            <CardBody>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <IconHash size="1rem" />
                {transaction.publicKey}
              </div>

              <Heading size="lg">
                ${transaction.amount}
              </Heading>
              <div className="flex items-center gap-1">
                <IconKey />
                {transaction.publicKey}
              </div>

              <div className="flex flex-col gap-1 whitespace-pre-line">
                <b>Asset:</b>
                <Code>
                  {attemptJSONPrettify(transaction.asset)}
                </Code>
              </div>

              {transaction.metadata && (
                <div className="flex gap-2">
                  <b>Metadata:</b>
                  <Code>
                    {JSON.stringify(transaction.metadata)}
                  </Code>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <PostTransactionModal open={postTransactionModalOpen} onClose={() => setPostTransactionModalOpen(false)} client={clientRef.current} onFinish={handleTransactions} />
    </>
  )
}

export default App
