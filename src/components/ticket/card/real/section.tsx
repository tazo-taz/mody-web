import { useReactToPrint } from 'react-to-print';
import RealTicketsSection2, { RealTicketsSection2Props } from './class'
import { useRef } from 'react';

export default function RealTicketsSection(props: RealTicketsSection2Props) {
    const print = useReactToPrint({
        documentTitle: "Tickets Print",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    const contentToPrint = useRef(null);

    const handlePrint = () => {
        print(null, () => contentToPrint.current)
    }

    return (
        <div>
            <RealTicketsSection2 handlePrint={handlePrint} {...props} />
        </div>
    )
}
