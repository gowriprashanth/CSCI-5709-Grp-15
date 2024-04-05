/**
 * @author Darshit Dhameliya
 */
import { useEffect, useState } from "react";

import {
    Row,
    Col
} from "antd";
import { FieldItem } from "../Dashboard/TeamTickets"
import * as TicketService from "../../services/TicketService"

/**
 * Ticket Detail Component
 */
export default function TicketHistory() {
    const [tickets, updateTickets] = useState([])

    const fetchAllResolvedTickets = async () => {
        try {
            const response = await TicketService.fetchAllResolvedTickets()
            if (response && response.data) {
                updateTickets(response.data)
            }
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllResolvedTickets()
    }, [])

    return (
        <>
            <h1>Ticket History</h1>
            <Row gutter={[16, 16]}>
                {
                    tickets.map((ticket, index) => <Col span={6} md={12} xs={24} lg={6}><FieldItem item={ticket} key={`ticket-${index}`}></FieldItem></Col>)
                }
            </Row>
        </>
    )
}