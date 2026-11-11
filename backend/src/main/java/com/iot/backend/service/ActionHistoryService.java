package com.iot.backend.service;

import com.iot.backend.dto.ActionHistoryDto;
import com.iot.backend.dto.PaginatedResponse;
import com.iot.backend.entity.ActionHistory;
import com.iot.backend.repository.ActionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActionHistoryService {

    @Autowired
    private ActionHistoryRepository actionHistoryRepository;

    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public PaginatedResponse<ActionHistoryDto> getHistory(
            int page, int pageSize, String device, String action, String status, String timeQuery) {

        PageRequest pageRequest = PageRequest.of(Math.max(0, page - 1), pageSize);

        // Tách timeQuery thành các phần (VD: "2026-11 11:15" -> part1 = "2026-11", part2 = "11:15")
        // Cho phép tìm kiếm khi người dùng xóa ngày, xóa giây, xóa tháng...
        String part1 = "";
        String part2 = "";
        if (timeQuery != null && !timeQuery.trim().isEmpty() && !"All Time".equalsIgnoreCase(timeQuery) && !"All".equalsIgnoreCase(timeQuery)) {
            String[] tokens = timeQuery.trim().split("\\s+");
            if (tokens.length > 0) part1 = tokens[0];
            if (tokens.length > 1) part2 = tokens[1];
        }

        Page<ActionHistory> resultPage = actionHistoryRepository.searchActionHistoryFlexible(device, action, status, part1, part2, pageRequest);

        List<ActionHistoryDto> dtoList = new ArrayList<>();
        long recordCounter = (long) (Math.max(0, page - 1) * pageSize) + 1;

        for (ActionHistory entity : resultPage.getContent()) {
            String timeFormatted = entity.getCreatedAt() != null ? entity.getCreatedAt().format(timeFormatter) : "";
            dtoList.add(new ActionHistoryDto(
                    String.format("%03d", recordCounter++),
                    entity.getDevice(),
                    entity.getAction(),
                    entity.getOperator() != null ? entity.getOperator() : "Nguyễn Thanh Bình",
                    entity.getStatus(),
                    timeFormatted
            ));
        }

        return new PaginatedResponse<>(dtoList, resultPage.getTotalElements(), page, pageSize);
    }
}

