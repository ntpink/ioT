package com.iot.backend.controller;

import com.iot.backend.dto.ActionHistoryDto;
import com.iot.backend.dto.PaginatedResponse;
import com.iot.backend.service.ActionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/action-history")
public class ActionHistoryController {

    @Autowired
    private ActionHistoryService actionHistoryService;

    /**
     * Lấy lịch sử thao tác thiết bị có lọc và phân trang
     * GET /api/v1/action-history?page=1&pageSize=5&device=...&action=...&status=...&time=...
     */
    @GetMapping
    public PaginatedResponse<ActionHistoryDto> getHistory(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(required = false) String device,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String time) {
        return actionHistoryService.getHistory(page, pageSize, device, action, status, time);
    }
}

