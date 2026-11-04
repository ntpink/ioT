package com.iot.backend.repository;

import com.iot.backend.entity.ActionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActionHistoryRepository extends JpaRepository<ActionHistory, Long> {

    @Query(value = "SELECT * FROM action_history a WHERE " +
           "(:device IS NULL OR :device = '' OR :device = 'All Devices' OR :device = 'All' OR LOWER(a.device) LIKE LOWER(CONCAT('%', :device, '%'))) AND " +
           "(:action IS NULL OR :action = '' OR :action = 'All Actions' OR :action = 'All' OR LOWER(a.action) LIKE LOWER(CONCAT('%', :action, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR :status = 'All Status' OR :status = 'All' OR LOWER(a.status) = LOWER(:status)) AND " +
           "(:timeQuery IS NULL OR :timeQuery = '' OR :timeQuery = 'All Time' OR :timeQuery = 'All' OR DATE_FORMAT(a.created_at, '%H:%i:%s %m/%d/%Y') LIKE CONCAT('%', :timeQuery, '%') OR DATE_FORMAT(a.created_at, '%Y-%m-%d %H:%i:%s') LIKE CONCAT('%', :timeQuery, '%')) " +
           "ORDER BY a.created_at DESC",
           countQuery = "SELECT count(*) FROM action_history a WHERE " +
           "(:device IS NULL OR :device = '' OR :device = 'All Devices' OR :device = 'All' OR LOWER(a.device) LIKE LOWER(CONCAT('%', :device, '%'))) AND " +
           "(:action IS NULL OR :action = '' OR :action = 'All Actions' OR :action = 'All' OR LOWER(a.action) LIKE LOWER(CONCAT('%', :action, '%'))) AND " +
           "(:status IS NULL OR :status = '' OR :status = 'All Status' OR :status = 'All' OR LOWER(a.status) = LOWER(:status)) AND " +
           "(:timeQuery IS NULL OR :timeQuery = '' OR :timeQuery = 'All Time' OR :timeQuery = 'All' OR DATE_FORMAT(a.created_at, '%H:%i:%s %m/%d/%Y') LIKE CONCAT('%', :timeQuery, '%') OR DATE_FORMAT(a.created_at, '%Y-%m-%d %H:%i:%s') LIKE CONCAT('%', :timeQuery, '%'))",
           nativeQuery = true)
    Page<ActionHistory> searchActionHistory(
            @Param("device") String device,
            @Param("action") String action,
            @Param("status") String status,
            @Param("timeQuery") String timeQuery,
            Pageable pageable
    );

    // Tìm bản ghi Pending gần nhất của thiết bị để chuyển thành Success khi nhận phản hồi ACK
    Optional<ActionHistory> findTopByDeviceAndStatusOrderByCreatedAtDesc(String device, String status);
}
